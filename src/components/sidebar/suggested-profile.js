import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getUserDocsByUserId, updateUserFollowing, updateFollowedUserFollowers } from "../../services/firebase";

export default function SuggestedProfile({ userDocId, username, profileId, userId }) {
    const [followed, setFollowed] = useState(false);

    async function handleFollowUser() {
        setFollowed(true);

        const [{ docId }] = await getUserDocsByUserId(userId); // get docId of our profile
        await updateUserFollowing(docId, profileId); // docId of us and profileId of them
        await updateFollowedUserFollowers(userDocId, userId); // userDocId of them and userId of us
        console.log(userDocId, docId);
    }

    return !followed ? (
        <div className="flex flex-row items-center align-items justify-between">
            <div className="flex items-center justify-between">
                <img className="rounded-full w-8 flex mr-3" src={`/images/avatars/${username}.jpg`} alt={`Follow ${username}`} />
                <Link to={`/p/${username}`}>
                    <p className="font-bold text-sm">{username}</p>
                </Link>
            </div>
            <div className="flex">
                <button className="text-sm font-bold text-blue-500" type="button" onClick={handleFollowUser}>
                    Follow
                </button>
            </div>
        </div>
    ) : null;
}
