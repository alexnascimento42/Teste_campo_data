const cypress = require("cypress")

describe('Age finder', () => { //codigo irá executar antes dos context.
    beforeEach(() => {
       const now = new Date('2022-03-08').getTime() //setando uma variavel now, ela será uma nova instancia de uma data, chamando a função getTime para transforma em uma timeTemp.

       cy.clock(now) //irá congelar a data passada no now: 2021-06-16
       cy.visit('/') //vistar a url relativa a aplicação.
    })
    
    context('Plural', () => {
        const inputs = [ //variavel input que contem dois obj
            {
                birthdate: '2021-03-08',
                age: '0' //data de nascimento hj e ano de vida 0.
            },
            {
                birthdate: '1982-04-15',
                age: '39' //data de nascimento e ano de vida 33.
            } 
        ]

        inputs.forEach( input => {
            it(`pluralizes he found age - ${input.age}`, () => {
                cy.setDate(input.birthdate)

                cy.contains('p', `you are ${input.age} years old`)
                  .should('be.visable')
                
            })
        })
    })

    context('Singular', () => {
     
        it('singularizes when age is 1', () => {
            cy.setDate('2020-06-16')

            cy.contains('p',"You'are 1 year old")
              .should('be.visible')
        })

    })

    context('Date in the future', () => {
      it('asks if you are from the future', () => {
          cy.setDate('2021-06-17')

          cy.contains('p','Are you from the future?')
            .should('be.visible')
      })
    })
})