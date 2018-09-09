function openModal() {
    document.getElementById('modal-two').style.display='none';
     return document.getElementById('modal').style.display='block';
}

function closeModal(){
    return document.getElementById('modal').style.display='none'
}

function closeModalTwo(){
    return document.getElementById('modal-two').style.display='none'
}

function modifyModal(){
     document.getElementById('modal').style.display='none';
    return document.getElementById('modal-two').style.display='block';
}
