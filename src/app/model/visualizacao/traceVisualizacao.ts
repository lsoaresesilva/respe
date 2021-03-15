export default class TraceVisualizacao{

    static possuiErro(trace){
        const padrao = /Traceback/gs
        let re = new RegExp(padrao);
        let resultado = re.exec(String(trace))
        return resultado != null?true:false;
    }
}