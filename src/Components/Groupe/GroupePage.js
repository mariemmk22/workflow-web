import React, { Component } from 'react';
import GroupeGrid from './GroupeGrid';
import GroupeAside from './GroupeAside';
import Impression from "../ComponentTable/Impression";
import ModalConfirmation from '../ComponentHelper/ModalConfirmation';

/**
 * GroupePage
 */
export class GroupePage extends Component {
    render() {
        return (
            <div>
                <GroupeGrid />
                <GroupeAside />
                <ModalConfirmation reducer="GroupeAsideReducer" />
                <Impression />

            </div>
        );
    }
}

export default GroupePage;
// import React, { Component } from 'react';
// import GroupeGrid from './GroupeGrid';
// import GroupeAside from './GroupeAside';
// import Impression from "../ComponentTable/Impression";
// import ModalConfirmation from '../ComponentHelper/ModalConfirmation';

// /**
//  * GroupePage
//  */
// export class GroupePage extends Component {
//     render() {
//         return (
//             <div>
//                 <GroupeGrid />
//                 <GroupeAside />
//                 <ModalConfirmation reducer="GroupeAsideReducer" />
//                 <Impression />

//             </div>
//         );
//     }
// }

// export default GroupePage;