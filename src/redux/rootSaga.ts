import { all, fork } from "typed-redux-saga";

import { watchFetchDog } from "./dog/sagas";

// const watchAuthentication = function* () {
//     yield* takeEvery(UserActionTypes.LOGIN_START, loginSaga);
//     yield* takeEvery(UserActionTypes.REGISTER_START, registerSaga);
//     yield* takeEvery(InteractActionTypes.CONFIRM_EMAIL_START, confirmEmailSaga);
//     yield* takeEvery(InteractActionTypes.CHANGE_PASSWORD_START, changePasswordSaga);
//     yield* takeEvery(InteractActionTypes.CONFIRM_CHANGE_PASSWORD_START, confirmChangePasswordSaga);
// };

const rootSaga = function* () {
    yield* all([
        fork(watchFetchDog),
        // fork(watchUser),
        // fork(watchInteractor),
        // fork(watchAlbum),
        // fork(watchImage),
        // fork(watchAuthentication),
        // fork(watchFetchRegisteredVisitor),
    ]);
};

export default rootSaga;
