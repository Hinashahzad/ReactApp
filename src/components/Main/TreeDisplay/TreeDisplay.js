import React, { useState} from 'react'
import '../Main.css'
import { Node} from '@dhis2/ui-core'
import reactRouterDom from 'react-router-dom'
const { withRouter } = reactRouterDom;

/*
 * Displays the tree done in a recursive manner.
 *
 */
export const TreeDisplay = withRouter((props) => {
    const [modalShow, setModalShow] = React.useState(props.beOpen);

    const [items, setItems] = useState({
        user: props.data
    })

    let { user } = items;

    return (
        <>
            <div key={props.key} className="treeView">
                {user &&
                    <Node
                        component={<><input
                            type="radio"
                            name={"facility"}
                            value={user.id}
                            className="form-check-input"
                            onChange={function () {
                                props.handleChange(user.id, user.displayName);
                            }}
                        />
                            <span className="jsx-226809133">{user.displayName}</span></>}
                        onClose={function () {
                            setModalShow(false);
                        }}
                        onOpen={function () { setModalShow(true); }}
                        open={modalShow}
                    >
                        {
                            //Displays the tree in a recursive manner.
                            user.children ? user.children.map(d => {
                                return (<TreeDisplay data={d} key={d.id} OrgUnit={d.id} handleChange={props.handleChange} />)
                            }) : ""
                        }
                    </Node>
                }
            </div>
        </>
    )
});