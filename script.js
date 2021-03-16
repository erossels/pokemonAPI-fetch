$(document).ready(function(){
    let next = "https://pokeapi.co/api/v2/pokemon/";
    getCharacters()
    $('.btn__more').click(function(e){
        e.preventDefault();
        $("#info").html("");
        getCharacters();
    });


    function  getCharacters(){
        $.ajax({
            url: next,
            context: document.body,
            method: 'GET',
            success: function(response){ 
                next = response.next
                var n = 1
                response.results.forEach(function(info){
                    let details = `
                    <div class='container col-md-4 '>
                    <div class="card mb-5 mt-5 pt-5 pb-5" style="width: 18rem;">
                    <img id='current-${n}' class='card-img-top' alt='error' width='100' height='100'>
                    <div class="card-body">
                      <h1 class="card-title">${info.name}</h1>
                      <a id='enlace-${n}' href="#" url="${info.url}" class="btn btn-primary">¡Quiero ver más de este pokémon!</a>
                    </div>
                  </div> 
                  </div>`

                  $('#info').append(details);
                  n = n+1;
                })
            }, 
            complete: function(){

                nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
                nums.forEach(function(num){
                    n_url = $("#enlace-"+num.toString()+"").attr('url');
                    console.log(n_url);
                    $.ajax({
                        url: n_url,
                        context: document.body,
                        method: 'GET',
                        success: function(response){ 
                            $("#current-"+num.toString()+"").attr('src', ""+response.sprites.front_default+"");
                        }
                    })
                })


                // $('#info').children.each(function(child){
                //     $.ajax({
                //         url: $(this).attr('url'),
                //         context: document.body,
                //         method: 'GET',
                //         success: function(response){ 
                //             $(child).attr('src', ""+response.sprites.front_default+"");
                //         }
                //     })
                // })

                $('.btn-primary').click(function(e){
                    e.preventDefault();
                    $('#myModal').modal('show') 
                    let new_url = ($(this).attr('url'));
                    $.ajax({
                        url: new_url,
                        context: document.body,
                        method: 'GET',
                        success: function(response){
                            $('#namePokemon').append(response.species.name.charAt(0).toUpperCase() + response.species.name.substr(1).toLowerCase())
                            $("#namePokemon").append("<img class='ml-5' src='"+response.sprites.front_default+"'></img>")
                            $("#namePokemon").append("<img class='ml-5' src='"+response.sprites.front_shiny+"'></img>")
                            response.abilities.forEach(function(abi){
                                $("#abilityPokemon").append("<p>"+abi.ability.name.charAt(0).toUpperCase()+abi.ability.name.substr(1).toLowerCase()+"</p>")
                            })
                            response.types.forEach(function(tipo){
                                $("#typePokemon").append("<p>"+tipo.type.name.charAt(0).toUpperCase()+tipo.type.name.substr(1).toLowerCase()+"</p>")
                            })

                            response.moves.forEach(function(move, index){
                                if (index < 5) {
                                    $("#movePokemon").append("<p>"+move.move.name.charAt(0).toUpperCase()+move.move.name.substr(1).toLowerCase()+"</p>")
                                }
                            
                            })

                            response.game_indices.forEach(function(index){
                                $("#generationPokemon").append("<p>"+index.version.name.charAt(0).toUpperCase()+index.version.name.substr(1).toLowerCase()+"</p>")
                            })
                        }
                    })
                    $('[data-dismiss="modal"]').click(function(){
                        $("#namePokemon").html("");
                        $("#abilityPokemon").html("");
                        $("#typePokemon").html("");
                        $("#movePokemon").html("");
                        $("#generationPokemon").html("");
                    })
                })
            }
        }).done(function() {
            $( this ).addClass( "done" );
        });
    
    }
    
})