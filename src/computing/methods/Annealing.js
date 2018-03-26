import Result from '../_common/Result.js';
import BufferedReply from '../_common/BufferedReply';

/**
 * Class for solving problems using simulated annealing
 */
export class AnnealingSolver{
  constructor(workerInterface){
    this._workerInterface = workerInterface;

    // buffers messages to reduce communication overhead while sending computation progress every cycle
    this._bufferedReply = new BufferedReply(this._workerInterface, 'progressBuffered', 75);
  }

  /**
   * Main function method, solves the problem using simulated annealing
   * @param  {object} problem type of problem
   * @param  {object} params  problem parameters
   * @return {Result} final configuration, its fitness and number of iterations
   */
  solve(problem, params){
      var currentTemp = +params.start_temp;
      var currentConfiguration = problem.getConfiguration();
      var currentNeighbour = currentConfiguration.getNeighbour();
      var counter = 0;

      this._workerInterface.reply('init', { numberOfIterations: Math.ceil((Math.log(+params.min_temp) - Math.log(+params.start_temp)) / Math.log(+params.cool_coef)) * +params.equil });

      // main cycle depending on temperature
      while (currentTemp > +params.min_temp) {
          //inner cycle, equilibrium
          for(var i = 0; i < +params.equil; i++){
              //next is better
              if(problem.getFitness(currentConfiguration) < problem.getFitness(currentNeighbour)){
                  currentConfiguration = currentNeighbour;
              }
              // next is worse
              else {
                  if(Math.random() < Math.exp((problem.getFitness(currentNeighbour) - problem.getFitness(currentConfiguration)) / currentTemp)){
                      currentConfiguration = currentNeighbour;
                  }
              }
              currentNeighbour = currentConfiguration.getNeighbour();
              counter++;
          }
          currentTemp *= +params.cool_coef;
          this._bufferedReply.addMessageWithAutoFlush({ fitness: problem.getFitness(currentConfiguration) });
      }
      this._bufferedReply.addMessage({ fitness: problem.getFitness(currentConfiguration) }).flush();
      return new Result(problem.getResult(currentConfiguration), problem.getFitness(currentConfiguration), counter);
  }
  /**
   * Function to compute starting temperature
   * @param  {object} problem type of problem
   * @param  {object} params  problem parameters
   * @return {int} calculated starting temperature
   */
  computeStartingTemp(problem){
      var currentConfiguration = problem.getConfiguration();
      var currentNeighbour = currentConfiguration.getNeighbour();
      var arrayOfEnergyStates = [];

      var wantedPropability = 0.5;
      var currentPropability = 0;

      var maxSum;
      var minSum;
      var newEnergyState;

      var temperature = 100;

      // filling array with random transitions, more precisly with energies of those transitions (max and min fitness)
      while(100*currentConfiguration.getSize() !== arrayOfEnergyStates.length)
      {
          newEnergyState = {
              max: Math.max(problem.getFitness(currentConfiguration), problem.getFitness(currentNeighbour)),
              min: Math.min(problem.getFitness(currentConfiguration), problem.getFitness(currentNeighbour))
          };
          if(newEnergyState.max > 0 && newEnergyState.min > 0) arrayOfEnergyStates.push(newEnergyState);

          currentConfiguration = currentNeighbour;
          currentNeighbour = currentConfiguration.getNeighbour();
      }
      //calculating temperature for which is the propability of accepting average worse state equals to wantedPropability
      while(Math.abs(wantedPropability - currentPropability) > 0.005)
      {
          maxSum = 0;
          minSum = 0;

          for(var i = 0; i < arrayOfEnergyStates.length; i++)
          {
              maxSum += Math.exp(-arrayOfEnergyStates[i].max / temperature);
              minSum += Math.exp(-arrayOfEnergyStates[i].min / temperature);
          }

          currentPropability = maxSum / minSum;
          //console.log(currentPropability);
          temperature = temperature * (-Math.log(currentPropability) / -Math.log(wantedPropability));
          console.log(currentPropability);
      }

      return temperature;
  }

  /**
   * Compute the size of inner cycle, its constant * size of the problem
   * @param  {[type]} problem [description]
   * @return {[type]}         [description]
   */
  computeEquil(problem){
    return problem.getConfiguration().getSize() * 10;
  }
}
