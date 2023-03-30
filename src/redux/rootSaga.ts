import { all, fork } from "typed-redux-saga";
import { watchCalcCase } from "./calcCase/sagas";

const rootSaga = function* () {
    yield* all([
        fork(watchCalcCase),
        // fork(watchAlbum),
        // fork(watchImage),
        // fork(watchAuthentication),
    ]);
};

export default rootSaga;
