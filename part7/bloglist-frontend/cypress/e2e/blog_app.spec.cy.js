
describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST','http://localhost:3003/api/testing/reset')
    const user = {
      name:'usuario',
      username:'usuario1',
      password:'usuario123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/',user)
    const user2 = {
      name:'usuario2',
      username:'usuario2',
      password:'usuario123'
    }
    cy.request('POST','http://localhost:3003/api/users/',user2)
    cy.visit('http://localhost:3000')
  })

  it('se puede usar el formulario de inicio de sesion', function() {
    cy.contains('login').click()
    cy.get('#username').type('usuario1')
    cy.get('#password').type('usuario123')
    cy.get('#login-form').click()

    cy.contains('usuario logged-in')
  })

  describe('Con un usuario logeado', function() {
    beforeEach(function() { //pruebe el inicio de sesion, solo una vez.
      cy.login({ username:'usuario1',password:'usuario123' })
    })
/*
    it('se puede ver la lista de todos los blogs', function() {
      cy.contains('blogs')
    })

    it('se puede crear un nuevo blog', function() {
      cy.contains('new Blog').click()
      cy.get('#title').type('a note created by cypress')
      cy.get('#author').type('user-test')
      cy.get('#url').type('www.cypress.com')
      cy.get('#create').click()
      cy.contains('a note created by cypress')
    })

    describe('se puede dar like a un blog', function() {
      beforeEach(function () {
        cy.createBlog({
          title:'another blog create with cypress',
          author:'author 1',
          url:'www.titulo1.com'
        })
      })

      it('mostrar mas informacion y dar like', function () {
        cy.contains('another blog create with cypress')
          .contains('show').click()
          .get('#touch-like').click()

        cy.get('.success')
          .contains('another blog create with cypress ha recibido un like')

        cy.contains('another blog create with cypress')
          .get('.extra')
          .contains('Likes:1')
      })
    })

    describe('El usuario que crea un blog puede eliminarlo', function() {
      beforeEach(function () {
        cy.createBlog({
          title:'another blog create with cypress',
          author:'author 1',
          url:'www.titulo1.com'
        })
      })
      it('mostrar mas informacion y eliminar', function () {
        cy.contains('another blog create with cypress')
          .contains('show').click()
          .get('#remove-blog').click()

        cy.get('.success').contains('another blog create with cypress fue eliminado con exito')

      })
    })

    describe('un usuario crea un blog y otro usuario no puede eliminarlo', function () {
      beforeEach(function () {
        cy.createBlog({
          title:'un blog que no se puede eliminar',
          author:'author 2',
          url:'www.titulo2.com'
        })
      })
      it('un usuario no puede eliminar un blog que no es suyo', function () {
        cy.get('#log-out').click()
        cy.login({ username:'usuario2',password:'usuario123' })
        cy.contains('un blog que no se puede eliminar')
          .contains('show').click()
          .get('#button-remove')
          .should('have.css','display','none')
      })
    }) */

    describe('los blogs se ordenan por la cantidad de likes', function () {
      beforeEach(function () {
        cy.createBlog({
          title:'blog 1',
          author:'author 1',
          url:'www.blog1.com',
          likes:5
        })

        cy.createBlog({
          title:'blog 2',
          author:'author 2',
          url:'www.blog2.com',
          likes:7
        })

        cy.createBlog({
          title:'blog 3',
          author:'author 3',
          url:'www.blog3.com',
          likes:10
        })
      })

      it('ordenar los blogs por cantidad de likes', function () {
        cy.get('div.blog').parent().then(blogs => {
          expect(blogs.prevObject[0]).to.contains.text('blog 3')
          expect(blogs.prevObject[1]).to.contains.text('blog 2')
          expect(blogs.prevObject[2]).to.contains.text('blog 1')
        })

        cy.contains('blog 1')
          .find('button')
          .should('contain','show')
          .click()

        cy.contains('blog 1')
          .parent()
          .find('button')
          .should('contain','Like')
          .as('2like')

        cy.get('@2like').contains('Like').click()
        cy.wait(100)
        cy.get('@2like').contains('Like').click()
        cy.wait(100)
        cy.get('@2like').contains('Like').click()
        cy.wait(100)

        cy.get('div.blog').parent().then(blogs => {
          expect(blogs.prevObject[0]).to.contains.text('blog 3')
          expect(blogs.prevObject[1]).to.contains.text('blog 1')
          expect(blogs.prevObject[2]).to.contains.text('blog 2')
        })
      })
    })
  })

  /*
  it.only('login fails with wron password', function() {
    cy.contains('login').click()
    cy.get('#username').type('usuario1')
    cy.get('#password').type('usuario1')
    cy.get('#login-form').click()

    //cy.get('.error').contains('Credenciales incorrectas')
    cy.get('.error')
      .should('contain', 'Credenciales incorrectas')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style','solid')

    cy.get('html').should('not.contain', 'usuario logged-in')
  })*/
})