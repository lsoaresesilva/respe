import { Groups } from './groups';
import { ExperimentType } from './experimentType';

export default class Experiment {

    SESSION_STORAGE_NAME;
    static instance;
    static type;

    constructor(){
        this.SESSION_STORAGE_NAME = "groupExperiment";
    }

    static start(configurator){
        if(configurator == null)
            throw new Error("An configurator must be used.");
        if(configurator.type == null)
            throw new Error("You must inform the type of experiment.");

        this.type = configurator.type;
    }

    static get(){
        if(this.instance == null){
            return new Experiment();
        }

        return this.instance;
    }

    /**
     * Assigns a user to an group (control or experimental). Users are assigned randomly based on the quantity of users in each group.
     * //TODO: If random is set then users are assigned independent of the quantity of users in each group.
     * @param count 
     * @param random 
     */
    static assignToGroup(count, random = null){
        if(typeof count == "number"){ // todo: check if it is a integer.
            // se for do tipo controle experimento
            if(this.type == ExperimentType.controlExperiment){
                if(count%2 == 0){ // se for número par jogar no experimental
                    return Groups.experimentalA;
                }else{    // se for número ímpar jogar no controle
                    return Groups.control;
                }
            }else{
                throw new Error("You must provide the type property in your experiment class. It can be one of ExperimentType enumaration value.");
            }
            
        }else{
            throw new Error("A number of users must be provided as an integer.");
        }
    }

}