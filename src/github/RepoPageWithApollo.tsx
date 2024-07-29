import { useState } from 'react';
import { SearchCriteria } from '../api/types';
import { HeaderWithApollo } from './HeaderWithApollo';
import { SearchRepoForm } from './SearchRepoForm';
import { FoundRepo } from './FoundRepo';
import { StarRepoButton } from './StarRepoButton';
import { useApolloClient, useLazyQuery, useMutation } from '@apollo/client';
import { GET_REPO } from '../api/getRepoWithApollo';
import { STAR_REPO } from '../api/starRepoWithApollo';

export function RepoPageWithApollo() {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria | undefined>();

  /**
   * use the useLazyQuery hook rather than useQuery
   * because we want to trigger the query during form submission rather than when the component mounts
   * The first element "getRepo" is a function that can be called to trigger the query
   */
  const [getRepo, { data }] = useLazyQuery(GET_REPO);

  const queryClient = useApolloClient();

  const [starRepo] = useMutation(STAR_REPO, {
    onCompleted: () => {
      queryClient.cache.writeQuery({
        query: GET_REPO,
        data: {
          repository: {
            ...data.repository,
            viewerHasStarred: true,
          },
        },
        variables: searchCriteria,
      });
    },
  });

  function handleSearch(search: SearchCriteria) {
    getRepo({
      variables: { ...search },
    });
    setSearchCriteria(search);
  }

  function handleStarClick() {
    if (data) {
      starRepo({ variables: { repoId: data.repository.id } });
    }
  }

  return (
    <>
      <HeaderWithApollo />
      <main className="max-w-xs ml-auto mr-auto">
        <SearchRepoForm onSearch={handleSearch} />
        {data && (
          <>
            <FoundRepo
              name={data.repository.name}
              description={data.repository.description}
              stars={data.repository.stargazers.totalCount}
            />
            {!data.repository.viewerHasStarred && <StarRepoButton onClick={handleStarClick} />}
          </>
        )}
      </main>
    </>
  );
}
