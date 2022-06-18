import type { NextPage } from "next";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

const QUERY = gql`
query{
  mangas {
    data {
      id
      attributes {
      	name
        cover {
          data {
            attributes {
              url
            }
          }
        }
    	}
  	}
  }
}
`;

const Home: NextPage = () => {
  const [open, setOpen] = useState(false);
  const { data, loading, error } = useQuery(QUERY);
  console.log({data,loading, error});
  if (loading) {
    return <>loading</>;
  }
  return <>me index</>;
};

export default Home;
