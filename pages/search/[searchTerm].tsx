import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { useRouter } from "next/router";

import userAuthStore from "../../store/authStore";
import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { BASE_URL } from "../../utils";
import { IUser, Video } from "../../types";

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState(false);
  const router = useRouter();
  const { searchTerm }: any = router.query;
  const { allUsers } = userAuthStore();

  const account = isAccounts ? `border-b-2 border-black` : `text-gray-400`;
  const isVideos = !isAccounts ? `border-b-2 border-black` : `text-gray-400`;
  const searchedAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${account}`}
          onClick={() => setIsAccounts(true)}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div className="md:mt-16 ">
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser, idx) => (
              <Link href={`/profile/${user._id}`} key={idx}>
                <div className="flex p-2 cursor-pointer font-semibold rounded border-b-2 gap-3">
                  <div>
                    <Image
                      width={50}
                      height={50}
                      className="rounded-full cursor-pointer"
                      src={user.image}
                      alt="user-profile"
                    />
                  </div>

                  <div>
                    <p className="flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-primary">
                      {user.userName} <GoVerified className="text-blue-400" />
                    </p>
                    <p className="capitilize text-xs text-gray-400">
                      {user.userName}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={``} />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
          {videos.length ? (
            videos.map((video: Video, idx) => (
              <VideoCard key={idx} post={video} />
            ))
          ) : (
            <NoResults text={`No Video result for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: {
      videos: res.data,
    },
  };
};

export default Search;
