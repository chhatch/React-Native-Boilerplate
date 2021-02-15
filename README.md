# React Native Boilerplate
The is a simple project establishes a robust base for a React Native Application able to run on Android, iOS, and modern web browsers.

##### Code Structure
The general idea is for components to dispatch thunks. Thunks can dispatch actions, call services, and call workflows. Thunks will mainly call worksflows, which are pipelines of services. Workflows mainly call services. Workflows and services are not dispatched.

##### Testing
Components are tested by making sure they look right and saving a snapshot (interacvtivity will be tested later). Action creators are not being tested because the tests are more complicated than the functions tested. Services are the most important to unit test because they contain most of the logic for the app. When thunks and workflows are tested we only check to make sure they are calling the correct functions in the right order with the correct arguments.

#### Error Handling
Error reporting is handled by middleware, so thunks should return a rejected promise on error. However, most error handling should be done locally. For instance, if there is an error in the signIn thunk it is responsible for cleaning up the mess. It may make sense later to have some of the error handling done in the middleware as the app grows more complicated and some errors may affect many parts of the app. It might look something like this:

```
const signIn = () => 
    Auth.signIn()
    .catch(signInFail)
    .catch(signInError)
```

signInFail rejects with the same error that was passed to it, and signInError repackages the error in preparation for further handling in middle where it would pass through a reducer or something.
