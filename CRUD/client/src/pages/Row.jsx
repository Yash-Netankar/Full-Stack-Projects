import React from 'react';
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

const Row = ({ value, deletef }) => {
    return (
        <tr>
            <td>{value.sid}</td>
            <td>{value.name}</td>
            <td>{value.email}</td>
            <td>{value.phone}</td>
            <td className="icons">
                <NavLink to={`/update/${value.sid}/${value.name}/${value.email}/${value.phone}/`} exact activeClassName="active">
                    <IconButton aria-label="delete" className="update" title="update">
                        <CreateIcon />
                    </IconButton>
                </NavLink>
                <NavLink to="" activeClassName="active">
                    <IconButton aria-label="delete" className="delete" title="delete" onClick={() => deletef(value.sid)}>
                        <DeleteIcon />
                    </IconButton>
                </NavLink>
            </td>
        </tr>
    )
}

export default Row
