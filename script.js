$(document).ready(function(){
    let next = "https://pokeapi.co/api/v2/pokemon/";
    getCharacters()
    $('.btn__more').click(function(e){
        e.preventDefault();
        $("#info").html("");
        getCharacters();
    });


    function  getCharacters(){

        fetch(next).then(function(response){
            return response.json();
        })
        .then(function(response){
            next = response.next
            var n = 1
            response.results.forEach(function(info){
                let details = `
                <div class='container col-md-4 '>
                <div class="card mb-5 mt-5 pt-5 pb-5" style="width: 18rem;">
                <img id='current-${n}' class='card-img-top' alt='error' width='100' height='100'>
                <div class="card-body">
                    <h1 class="card-title">${info.name.charAt(0).toUpperCase()+info.name.substr(1).toLowerCase()}</h1>
                    <a id='enlace-${n}' href="#" url="${info.url}" class="btn btn-primary">¡Quiero ver más de este pokémon!</a>
                </div>
                </div> 
                </div>`

                $('#info').append(details);
                n = n+1;
            })
        }).then(function(){
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


            $('.btn-primary').click(function(e){
                e.preventDefault();
                $('#myModal').modal('show') 
                let new_url = ($(this).attr('url'));
                
                fetch(new_url).then(function(response){
                    return response.json()
                })
                .then(function(response){
                    $('#namePokemon').append(response.species.name.charAt(0).toUpperCase() + response.species.name.substr(1).toLowerCase())
                    $("#namePokemon").append("<img class='ml-5' src='"+response.sprites.front_default+"'></img>")
                    $("#namePokemon").append("<img class='ml-5' src='"+response.sprites.front_shiny+"'></img>")
                    let n = 1
                    response.abilities.forEach(function(abi){
                        $("#abilityPokemon").append("<p>"+abi.ability.name.charAt(0).toUpperCase()+abi.ability.name.substr(1).toLowerCase()+"</p>").append(
                            `<div id="btn__habilities-${n.toString()}" type="button" class="btn btn-warning" href="#">
                                Otros pokemones con esta habilidad
                            </div>`
                        )
                        n = n+1;
                    })
                    n = 1
                    response.types.forEach(function(tipo){
                        $("#typePokemon").append("<p>"+tipo.type.name.charAt(0).toUpperCase()+tipo.type.name.substr(1).toLowerCase()+"</p>").append(
                            `<div id="btn__types-${n.toString()}" type="button" class="btn btn-warning btn__types" href="#">
                                Ver relaciones de daño
                            </div>`
                        )
                        n = n+1;
                    })

                    response.moves.forEach(function(move, index){
                        if (index < 5) {
                            $("#movePokemon").append("<p>"+move.move.name.charAt(0).toUpperCase()+move.move.name.substr(1).toLowerCase()+"</p>")
                        }
                    
                    })

                    response.game_indices.forEach(function(index){
                        $("#generationPokemon").append("<p>"+index.version.name.charAt(0).toUpperCase()+index.version.name.substr(1).toLowerCase()+"</p>")
                    })

                    return response

                }).then(function(response){
                    z = 1
                    response.abilities.forEach(function(abi){
                        $("#btn__habilities-"+z.toString()+"").click(function(){
                            $('#secondaryModal').modal('show');
                            $('#secondaryh2').text("Pokemones con la habilidad:");
                            let url_abilities = abi.ability.url;
                            similarAbilities(url_abilities);
                        })
                        z = z+1;
                    })

                    z = 1
                    response.types.forEach(function(tipo){
                        $("#btn__types-"+z.toString()+"").click(function(){
                            $('#secondaryModal').modal('show');
                            $('#secondaryh2').text("Relaciones de daño por tipo:");
                            let url_type = tipo.type.url;
                            getTypeRelations(url_type);
                        })
                        z = z+1;
                    })

                    $('[data-dismiss="secondaryModal"]').click(function(){
                        $('#secondaryModal').modal('hide');
                        $("#secondaryModal__p").html("");
                        $('#secondaryh2').html("");
                    })
                    
                })

                $('[data-dismiss="modal"]').click(function(){
                    $("#namePokemon").html("");
                    $("#abilityPokemon").html("");
                    $("#typePokemon").html("");
                    $("#movePokemon").html("");
                    $("#generationPokemon").html("");
                })
            })        
        })
    }

    function similarAbilities(url){
        fetch(url).then(function(response){
            return response.json()
        })
        .then(function(response){
            response.pokemon.forEach(function(ind){
                $('#secondaryModal__p').append("<div class='col-md-2 mx-auto'> <div class='col-md-2'>"+ind.pokemon.name.charAt(0).toUpperCase()+ind.pokemon.name.substr(1).toLowerCase()+"<img class='' src='"+"</div></div>")
                
            })
        })

    }

    function getTypeRelations(url){
        fetch(url).then(function(response){
            return response.json()
        })
        .then(function(_response){
            $('#secondaryModal__p').append("<div class='damage-2-from' > <h4> Doble daño de: </h4> </div>")
            $('#secondaryModal__p').append("<div class='damage-2-to' > <h4> Doble daño a: </h4> </div>")  
            $('#secondaryModal__p').append("<div class='damage-05-from' > <h4> Mitad de daño de: </h4> </div>")   
            $('#secondaryModal__p').append("<div class='damage-05-to' > <h4> Mitad de daño a: </h4> </div>")    
            $('#secondaryModal__p').append("<div class='damage-0-from' > <h4> Sin daño de: </h4> </div>")  
            $('#secondaryModal__p').append("<div class='damage-0-to' > <h4> Sin daño a: </h4> </div>")

            return _response
        })
        .then(function(response){
            response.damage_relations.double_damage_from.forEach(function(i){
                $('.damage-2-from').append("<div class='col-md-2'><div class='col-md-2'>"+i.name.charAt(0).toUpperCase()+i.name.substr(1).toLowerCase()+"</div></div>")
            })
            response.damage_relations.double_damage_to.forEach(function(i){
                $('.damage-2-to').append("<div class='col-md-2'><div class='col-md-2'>"+i.name.charAt(0).toUpperCase()+i.name.substr(1).toLowerCase()+"</div></div>")
            })
            response.damage_relations.half_damage_from.forEach(function(i){
                $('.damage-05-from').append("<div class='col-md-2'><div class='col-md-2'>"+i.name.charAt(0).toUpperCase()+i.name.substr(1).toLowerCase()+"</div></div>")
            })
            response.damage_relations.half_damage_to.forEach(function(i){
                $('.damage-05-to').append("<div class='col-md-2'><div class='col-md-2'>"+i.name.charAt(0).toUpperCase()+i.name.substr(1).toLowerCase()+"</div></div>")
            })
            response.damage_relations.no_damage_from.forEach(function(i){
                $('.damage-0-from').append("<div class='col-md-2'><div class='col-md-2'>"+i.name.charAt(0).toUpperCase()+i.name.substr(1).toLowerCase()+"</div></div>")
            })
            response.damage_relations.no_damage_to.forEach(function(i){
                $('.damage-0-to').append("<div class='col-md-2'><div class='col-md-2'>"+i.name.charAt(0).toUpperCase()+i.name.substr(1).toLowerCase()+"</div></div>")
            })
        })
    }

})
