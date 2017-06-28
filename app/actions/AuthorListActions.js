import alt from '../alt';
import AuthorSource from '../sources/AuthorSource';
class AuthorListActions {
	constructor() {
		this.generateActions(
			'onSuccess',
			'onFailure'
		);
	}
	getAuthor(page, limit) {
		AuthorSource.getAuthor(page, limit).then((data) => this.onSuccess(data));
	}

	getMoreAuthor(page, limit) {
		return AuthorSource.getAuthor(page, limit).then(function(data){
			return data
		});
	}

}

export default alt.createActions(AuthorListActions);