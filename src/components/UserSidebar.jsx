import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useCurrency } from "../Contexts/CryptoContext";
import { numberWithCommas } from "../config/api";
import { doc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";

const UserSidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { user, setAlert, watchlist, coins, symbol } = useCurrency();

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist !`,
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
      });
    }
  };

  const handleLogout = () => {
    signOut(auth);
    setAlert({
      open: true,
      message: "User Logout Successfully",
    });
  };
  return (
    <>
      <button className="avatar" onClick={() => setShowSidebar(true)}>
        {user?.photoURL ? (
          <img src={user?.photoURL} alt={user?.email} />
        ) : (
          <span>{user?.email.charAt(0).toUpperCase()}</span>
        )}
      </button>
      {showSidebar && (
        <div
          className={"sidebar-container"}
          onClick={(e) => {
            if (e.target.className === "sidebar-container") {
              setShowSidebar(false);
            }
          }}
        >
          <div className={showSidebar ? "sidebar active" : "sidebar"}>
            <button className="avatar">
              {user?.photoURL ? (
                <img src={user?.photoURL} alt={user?.email} />
              ) : (
                <span>{user?.email.charAt(0).toUpperCase()}</span>
              )}
            </button>
            <span>{user.email}</span>
            <div className="watchlist">
              <span>Watchlist</span>
              {coins.map((coin) => {
                if (watchlist.includes(coin.id))
                  return (
                    <div className="watchitem" key={coin.id}>
                      <span>{coin.name}</span>
                      <span style={{ display: "flex", gap: 8 }}>
                        {symbol}{" "}
                        {numberWithCommas(coin.current_price.toFixed(2))}
                        <AiFillDelete
                          style={{ cursor: "pointer" }}
                          fontSize="16"
                          onClick={() => removeFromWatchlist(coin)}
                        />
                      </span>
                    </div>
                  );
              })}
            </div>
            <button className="logout" onClick={handleLogout}>
              LOGOUT
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserSidebar;
