export class AnnealingSolver{
  constructor(workerInterface, params){
    this.workerInterface = workerInterface;
    this.params = params;
  }

  solve(problem){
      this.currentTemp = params.start_temp;
      while (this.currentTemp > params.min_temp) {
          for(var i = 0; i < params.equil; i++){
              if(problem.getFitness() < problem.getNeighbor().getFitness()){
                  problem.setNeighborAsCurrent();
              }
              else {
                  if(Math.random() < Math.exp((problem.getNeighbor().getFitness() - problem.getFitness()) / this.currentTemp)){
                      problem.setNeighborAsCurrent();
                  }
              }
              problem.setNewNeighbor();
          }
          this.currentTemp *= this.params.cool_coef;
      }
  }

  computeStartingTemp(){

  }
}
