import { Observable } from 'rxjs/Rx';
import { HttpService } from './httpService';
import { Appaction } from '../actions/appactions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ofType } from "redux-observable";
import "rxjs";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
export default class RootEpic {

    static deleteTodo = action$ => {
        return action$.pipe(
            ofType(Appaction.DELETE_TODO),
            switchMap(({ payload }) => {
                return HttpService.delete(`https://restapiboilerplate.herokuapp.com/api/ninjas/${payload}`)
                    .pipe(
                        map(res => {
                            return {
                                type: Appaction.DELETE_TODO_SUCCESS,
                                payload: res.response
                            };
                        }),
                        catchError(a => {
                            return Observable.of({
                                type: Appaction.DELETE_TODO_FAIL
                            });
                        })
                    )

            })
        );
    };
    static updateTodo = action$ => {
        return action$.pipe(
            ofType(Appaction.UPDATE_TODO),
            switchMap(({ payload }) => {
                var newPayload={
                    name:payload.names,
                    rank:payload.ranks
                }
                console.log(payload.ids)
                return HttpService.put(`https://restapiboilerplate.herokuapp.com/api/ninjas/${payload.ids}`,newPayload)
                    .pipe(
                        map(res => {
                            return {
                                type: Appaction.UPDATE_TODO_SUCCESS,
                                payload: res.response
                            };
                        }),
                        catchError(a => {
                            alert("error")
                            return Observable.of({
                                type: Appaction.UPDATE_TODO_FAIL
                            });
                        })
                    )

            })
        );
    };
}