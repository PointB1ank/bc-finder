
//get elements
const txtEmail = document.getElementById('regEmail');
const txtPassword = document.getElementById('regPassword');
const signUp = document.getElementById('signUp');

//add sign up events
signUp.addEventListener('click', e => {

    //get email and pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    //register
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));

});

txtPassword.addEventListener('keyup', e => {

    if(e.keyCode === 13) {
        //get email and pass
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        //register
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    }
});

txtEmail.addEventListener('keyup', e => {

    if(e.keyCode === 13) {
        //get email and pass
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        //register
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));

    }
});
