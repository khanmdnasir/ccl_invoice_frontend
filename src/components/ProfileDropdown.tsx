import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import classNames from 'classnames';
import { logoutUser,resetAuth } from '../redux/actions';
import { useDispatch } from 'react-redux';
import Avatar from 'react-avatar';


interface ProfileMenuItem {
    label: string;
    icon: string;
    redirectTo: string;
}

interface ProfileDropdownProps {
    menuItems: Array<ProfileMenuItem>;
    profilePic?: string;
    username: string;
    userTitle?: string;
    firstName?: string;
    lastName?: string;
}

const ProfileDropdown = (props: ProfileDropdownProps) => {
    const profilePic = props['profilePic'] || null;
    const firstName = props['firstName'];
    const lastName = props['lastName'];
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const dispatch = useDispatch();
    /*
     * toggle profile-dropdown
     */

    console.log('first name', firstName,'lastname',lastName)
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        dispatch(resetAuth());
        dispatch(logoutUser());
    }

    return (
        <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
            <Dropdown.Toggle
                id="dropdown-profile"
                as="a"
                onClick={toggleDropdown}
                className={classNames('nav-link nav-user me-0 waves-effect waves-light', { show: dropdownOpen })}
            >
                {/* <img src={profilePic!} className="rounded-circle" alt="" /> */}
                <div>
                    <Avatar name={firstName+" "+lastName} maxInitials={2} round="50px" size="50" textSizeRatio={1.9} color="#00A551"/>
                </div>
                <span className="pro-user-name ms-1">
                    {props['username']} <i className="mdi mdi-chevron-down" style={{color: 'white'}}></i>
                </span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu dropdown-menu-end profile-dropdown">
                <div onClick={toggleDropdown}>
                    <div className="dropdown-header noti-title">
                        <h6 className="text-overflow m-0">Welcome !</h6>
                    </div>
                    {(props.menuItems || []).map((item, i) => {
                        return (
                            <React.Fragment key={i}>
                                {i === props['menuItems'].length - 1 && <div className="dropdown-divider"></div>}
                                <Link
                                    to={item.redirectTo}
                                    onClick={()=>{item.label === 'Logout' && handleLogout()}}
                                    className="dropdown-item notify-item"
                                    key={i + '-profile-menu'}
                                >
                                    <i className={`${item.icon} me-1`} ></i>
                                    <span>{item.label}</span>
                                </Link>
                            </React.Fragment>
                        );
                    })}
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ProfileDropdown;
