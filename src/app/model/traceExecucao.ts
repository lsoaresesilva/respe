class CodigoExecucao{

    linha;
    

}

export default class TraceExecucao{

    linhas:CodigoExecucao;


    constructor(public trace){

    }

    construir(){

        this.trace.forEach(trace=>{

        });

        for(let nomeVariavel in this.trace){

        }
    }

}

/**
 * "trace": [
    {
      "line": 1,
      "event": "step_line",
      "func_name": "<module>",
      "globals": {},
      "ordered_globals": [],
      "stack_to_render": [],
      "heap": {},
      "stdout": ""
    },
    {
      "line": 2,
      "event": "step_line",
      "func_name": "<module>",
      "globals": {
        "x": "dois"
      },
      "ordered_globals": [
        "x"
      ],
      "stack_to_render": [],
      "heap": {},
      "stdout": "dois\n"
    },
    {
      "line": 3,
      "event": "step_line",
      "func_name": "<module>",
      "globals": {
        "x": "dois",
        "fruits": [
          "REF",
          1
        ]
      },
      "ordered_globals": [
        "x",
        "fruits"
      ],
      "stack_to_render": [],
      "heap": {
        "1": [
          "LIST",
          "banana",
          "ma\u00e7\u00e3"
        ]
      },
      "stdout": "dois\n"
    },

 */