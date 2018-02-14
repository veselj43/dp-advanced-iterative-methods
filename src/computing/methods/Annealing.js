import Result from '../_common/Result.js';
import BufferedReply from '../_common/BufferedReply';

export class AnnealingSolver{
  constructor(workerInterface){
    this._workerInterface = workerInterface;

    // buffers messages to reduce communication overhead while sending computation progress every cycle
    this._bufferedReply = new BufferedReply(this._workerInterface, 'progressBuffered', 75);
  }

  solve(problem, params){
      var currentTemp = params.start_temp;
      var currentConfiguration = problem.getConfiguration();
      var currentNeighbour = currentConfiguration.getNeighbour();
      var counter = 0;

      this._workerInterface.reply('init', { numberOfIterations: 10000 });

      while (currentTemp > params.min_temp) {
          for(var i = 0; i < params.equil; i++){
              this._bufferedReply.addMessageWithAutoFlush({ fitness: problem.getFitness(currentConfiguration) });

              if(problem.getFitness(currentConfiguration) < problem.getFitness(currentNeighbour)){
                  currentConfiguration = currentNeighbour;
              }

              else {
                  if(Math.random() < Math.exp((problem.getFitness(currentNeighbour) - problem.getFitness(currentConfiguration)) / currentTemp)){
                      currentConfiguration = currentNeighbour;
                  }
              }

              currentNeighbour = currentConfiguration.getNeighbour();
              counter++;
          }
          currentTemp *= params.cool_coef;
      }
      this._bufferedReply.addMessage({ fitness: problem.getFitness(currentConfiguration) }).flush();
      return new Result(currentConfiguration.getBitArray(), problem.getFitness(currentConfiguration), counter);
  }

  computeStartingTemp(){

  }
}
