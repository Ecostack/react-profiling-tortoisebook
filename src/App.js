import './App.css';
import {UserProfile} from "./UserProfile";
import {useCallback, useEffect, useRef, useState} from "react";
import profileImage from './profile.jpg'

const names = ['Jennifer', 'Linda', 'John']

export const useMount = (effect) => {
    const mounted = useRef(false);

    useEffect(() => {
        if (mounted.current) {
            return effect();
        }

        mounted.current = true;

        return () => {
        };
    }, [mounted, effect]);
};

function App() {
    const [users, setUsers] = useState([])
    const [favorite, setFavorite] = useState({})

    const loadMore = useCallback(() => {
        setUsers(oldState =>
            [...oldState,
                ...new Array(names.length)
                    .fill(0)
                    .map((value, index) => ({
                            name: names[index % names.length],
                            id: oldState.length + index+ 1,
                            image: profileImage
                        })
                    )
            ]
        )
    }, [])

    useMount(loadMore)

    return (
        <div className="App">
            <h2>Friends</h2>
            {users.map(user =>
                <UserProfile key={user.id} image={user.image} id={user.id} name={user.name}
                             favorite={Boolean(favorite[user.id])}
                             setFavorite={setFavorite}
                ></UserProfile>
            )}
            <button onClick={loadMore}>Load more</button>
        </div>
    );
}

export default App;
