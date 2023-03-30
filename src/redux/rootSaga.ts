import { all, fork } from "typed-redux-saga";
import { watchFetchCalcCase } from "./calcCase/sagas";

const rootSaga = function* () {
    yield* all([
        fork(watchFetchCalcCase),
        // fork(watchUser),
        // fork(watchInteractor),
        // fork(watchAlbum),
        // fork(watchImage),
        // fork(watchAuthentication),
        // fork(watchFetchRegisteredVisitor),
    ]);
};

export default rootSaga;
