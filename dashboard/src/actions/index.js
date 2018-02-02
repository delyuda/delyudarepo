import mockData from '../mocks/mockData';

export function loadData() {
    console.log('loadData');
    return dispatch => {

        dispatch({
            type: 'LOAD_DATA_REQUESTED'
        });

        setTimeout(() => {
            console.log('timeout');
            dispatch({
                type: 'LOAD_DATA_OK',
                data: mockData
            });
        }, 500);


        // request.get(
        //     Routes.root_path(),
        //     {headers: {'Accept': 'application/json'}}
        // )
        //     .then(result => {
        //         dispatch({
        //             type: 'LOAD_DATA_OK',
        //             data: result.data
        //         })
        //     })
        //     .catch(result => {
        //         dispatch({
        //             type: 'LOAD_DATA_FAIL',
        //             errors: result.statusText
        //         })
        //     })
    }
}