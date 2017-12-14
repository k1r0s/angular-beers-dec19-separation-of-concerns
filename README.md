### Separation of Concerns in Modern JavaScript

https://www.meetup.com/es-ES/AngularJS-Beers/events/244112055/

How to run the code:

1. `git clone https://github.com/k1r0s/angular-beers-dec19-separation-of-concerns.git`

2. `cd angular-beers-dec19-separation-of-concerns && npm install`

3. `npm run jsonph` (mock api)

4. `npm run dev` (live reload)

5. browse localhost:4200

6. `git tag` (you may checkout any tag to understand how the repo was build)

Intro: We're going to see a simple __Preact__ app which will grow a little while the talk to illustrate real problems that may appear in Development Process and how to deal with using modern techniques and tools such as ES7 Decorators.

Decorators are a feature that allows to nicely call HOF from elsewhere and, modify decorated subjects such as classes or methods. __Say adding behaviors non-invasively__. Decorators are still experimental but they're going to stay here for sure.

Decorators provides a nice syntax to allow __Declarative Programming__ and are the natural vehicle of __Inversion of Control__ techniques such as Dependency Injection, Advice Injection, Reflection and so forth.

Today the subject is about dealing with code repetition which is due to some concerns, __often non-functional-concerns__, cannot be modularized in OOP, which means that naturally while the development process some __patterns__ of code, related with the architecture, spread all over the application often hiding what the program is actually trying to do.

##### Modularity increases software quality

```javascript
// general OOP approach
myMethodWithAVeryDescriptiveName() {
  console.log("we've entered this method with args..")
  // ...stuff that is truly related to the method responsibility
  console.log("we've finished this process..")  
}

@log // using advanced IoC techniques
myMethodWithAVeryDescriptiveName() {
  // ...stuff that is truly related to the method responsibility
}

```

Infrastructure patterns may be related to Asynchronous Code Management (such as AJAX), Exception Handling, Memoization, Caching, Parsing/Casting?/Mapping, Undo/Redo, Logging, Access Control (Authentication), Transactions, Resource Management, Data Validation, Retries, Debounce, UX taks such as Loading show/hide, Modal management, Event Listeners...

---

##### Tag brief explanation

- v1-single-user-component
> Simple application with one component which performs a GET to retrieve a list of users

- v2-two-components-similar-behavior
> Business ask for a second component which performs a GET with userId param to retrieve user posts. Actually we're running on a common situation where behavior gets duplicated over different concerns

- v3-create-advice-same-implementation
> We apply advice injection to get rid of code duplication. We abstract a piece of code which is repeated on both components by using advice 'dynamic context'

- v4-added-memoization-for-posts
> Business ask for an extra requirement on posts page which is 'do not fetch same user posts twice'. We create a storage service and two more advices, one of them will check on the storage if those posts were already fetched, if so prevent it, and the other will write on the storage results when fetched

- v5-pure-advices-with-di
> Our code actually works but since our code is growing and advices are widely used its a requirement that those processes can be properly tested. We implement dependency injection to make advices completely pure pieces and properly testable

- v6-non-functional-module
> Finally our aim is keep code as clean as possible so we try to simplify and modularize our behavior by separating concerns. So we create Aspects which are pieces that enable modularization of concerns, commonly non-functional-requirements

- testing..? These advices are __PURE FUNCTIONS__! EZ
