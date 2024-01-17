const form = document.querySelector('.contactContainer__contact-form') as HTMLFormElement;
const submitButton = document.querySelector('#submitFormButton') as HTMLElement
const emailInput = form.querySelector('#email') as HTMLInputElement;
const nameInput = form.querySelector('#name') as HTMLInputElement;
const subjectInput = form.querySelector('#subject') as HTMLInputElement;
const messageInput = form.querySelector('#message') as HTMLInputElement;

interface MyFormData {
    email: string;
    name: string;
    subject: string;
    message: string;
}

const emailRegex = /^(?!.*\.{2})[a-zA-Z0-9._-]+@(?!.*[0-9])(?!-)(?!\.)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
const nameRegex = /^(?=.*[a-zA-Z])([a-zA-Z]+(?:[\s-][a-zA-Z]+)*)$/;
const subjectRegex = /^[a-zA-Z\-]+$/;
const messageRegex = /^[a-zA-Z\-]+$/;

function validateEmail(email: string) {
    if (emailRegex.test(email)) {
        emailInput.style.border = '1px solid green';
        return true;
    } else {
        emailInput.style.border = '1px solid red';
        return false;
    }
}

function validateName(name: string) {
    if (nameRegex.test(name)) {
        nameInput.style.border = '1px solid green';
        return true;
    } else {
        nameInput.style.border = '1px solid red';
        return false;
    }
}

function validateSubject(subject: string) {
    if (subjectRegex.test(subject)) {
        subjectInput.style.border = '1px solid green';
        return true;
    } else {
        subjectInput.style.border = '1px solid red';
        return false;
    }
}

function validateMessage(message: string) {
    if (messageRegex.test(message)) {
        messageInput.style.border = '1px solid green';
        return true;
    } else {
        messageInput.style.border = '1px solid red';
        return false;
    }
}

function validateFormData(data: MyFormData) {
    const isEmailValid = validateEmail(data.email);
    const isNameValid = validateName(data.name);
    const isSubjectValid = validateSubject(data.subject);
    const isMessageValid = validateMessage(data.message);

    return isEmailValid && isNameValid && isSubjectValid && isMessageValid;
}

submitButton.addEventListener('click', (e) => {
    const myFormData: MyFormData = {
        email: emailInput.value,
        name: nameInput.value,
        subject: subjectInput.value,
        message: messageInput.value,
    };

    if (!validateFormData(myFormData)) {
        e.preventDefault();
    }

});

