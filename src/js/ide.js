// TODO: usar Observable para disparar quando o editor estiver pronto. Assim o model Editor pode ter acesso à instância do mônico quando ela estiver pronta.
function carregarIde(){


        require(['vs/editor/editor.main'], function () {
            
            //var appRoot = document.createElement("app-root"); 
            //document.getElementById("body").appendChild(appRoot);
            if(document.getElementById('container') != undefined){
                editor = monaco.editor.create(document.getElementById('container'), {
                value: [
                    'z = 3',
                    'print(x)',
                ].join('\n'),
                language: 'python'

            });
            }
            
            //
            //
        });

    }