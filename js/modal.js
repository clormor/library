/**
 * Modal effects inspired by codrops (https://tympanus.net/codrops/).
 * 
 * Read more here: http://tympanus.net/codrops/licensing/
 */
var Modal = (function () {

	let button = document.querySelector('.modal-show');
	let modal = document.querySelector('.modal-container');
	let close = modal.querySelector('.modal-close');

	function removeModal() {
		modal.classList.remove('modal-visible');
	}

	function displayModal() {
		modal.classList.add('modal-visible');
	}

	button.addEventListener('click', displayModal);
	close.addEventListener('click', removeModal);
})();