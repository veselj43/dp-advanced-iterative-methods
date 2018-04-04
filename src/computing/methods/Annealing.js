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

      this._workerInterface.reply('init', { numberOfIterations: Math.ceil((Math.log(+params.min_temp) - Math.log(+params.start_temp)) / Math.log(+params.cool_coef))});

      // main cycle depending on temperature
      while (currentTemp > +params.min_temp) {
          //inner cycle
          for(var i = 0; i < +params.innerCycle; i++){
              //next is better
              if(problem.getFitness(currentConfiguration) < problem.getFitness(currentNeighbour)){
                  currentConfiguration = currentNeighbour;
              }
              // next is worse
              else if(Math.random() < Math.exp((problem.getFitness(currentNeighbour) - problem.getFitness(currentConfiguration)) / currentTemp)){
                      currentConfiguration = currentNeighbour;
              }
              currentNeighbour = currentConfiguration.getNeighbour();
              counter++;
          }
          currentTemp *= +params.cool_coef;
          this._bufferedReply.addMessageWithAutoFlush( problem.getProblemCost(currentConfiguration) );
      }
      this._bufferedReply.addMessage( problem.getProblemCost(currentConfiguration) ).flush();
      return new Result(problem.getResult(currentConfiguration), problem.getProblemCost(currentConfiguration), counter);
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
      var size = currentConfiguration.getSize();
      var conf, neigh = 0;
      var max = 0;

      var temperature = 100;

      // filling array with random transitions, more precisly with energies of those transitions (max and min fitness)
      while(50*size !== arrayOfEnergyStates.length)
      {
          conf = problem.getFitness(currentConfiguration);
          neigh = problem.getFitness(currentNeighbour);
          if(Math.sign(conf) === Math.sign(neigh))
          {
            if(Math.sign(conf) === -1) {
              conf = -conf;
              neigh = -neigh;
            }
            newEnergyState = {
                max: Math.max(conf, neigh),
                min: Math.min(conf, neigh)
            };
            if(newEnergyState.max > max) max = newEnergyState.max > max;
            arrayOfEnergyStates.push(newEnergyState);
          }


          currentConfiguration = currentNeighbour;
          currentNeighbour = currentConfiguration.getNeighbour();
      }

      temperature = max;
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
          if(maxSum === 0 && minSum === 0) break;
          currentPropability = maxSum / minSum;
          if(currentPropability === 1) return 1;

          temperature = temperature * (-Math.log(currentPropability) / -Math.log(wantedPropability));
      }

      return Math.ceil(temperature);
  }

  /**
   * Compute the size of inner cycle, its constant * size of the problem
   * @param  {[type]} problem [description]
   * @return {[type]}         [description]
   */
  computeInnerCycle(problem){
    return 2*problem.getConfiguration().getSize();
  }
}
