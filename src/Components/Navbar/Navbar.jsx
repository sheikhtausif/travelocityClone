import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { logOut } from "../../Store/Action";

export function Navbar() {
    const userName = useSelector((state) => state.userName);
    const dispatch = useDispatch();

    console.log(userName);

    const handleSignOut = () => {
        dispatch(logOut());
    }

    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <div className={styles.NavWidth}>
                    <div className={styles.logo}>
                        <Link to="/"><img src="https://www.travelocity.com/_dms/header/logo.svg?locale=en_US&siteid=80001&2" alt="" /></Link>
                    </div>
                    <div>
                        <ul className={styles.navLinks}>
                            <li><a className={styles.travelNavLink} href="#">Español </a> </li>
                            <li><a className={styles.travelNavLink} href="#">List your property</a></li>
                            <li><a className={styles.travelNavLink} href="#">Support</a></li>
                            <li><a className={styles.travelNavLink} href="#">Trips</a></li>
                            <li><Link className={styles.travelNavLink} to="/signIn">{(userName === "") ? "Sign In" : userName}</Link></li>
                            <li><Link className={styles.travelNavLink} style={{display: `${(userName === "") ? "none" : "inline"}`}} to="#" onClick={handleSignOut}>Sign out</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}