import { useState } from 'react';
import { RepoData, SearchCriteria } from '../api/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRepo } from '../api/getRepo';
import { starRepo } from '../api/starRepo';
import { SearchRepoForm } from './SearchRepoForm';
import { FoundRepo } from './FoundRepo';
import { StarRepoButton } from './StarRepoButton';
import { Header } from '../Header';

export function RepoPage() {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria | undefined>();

  /**
   * We don't want the query to execute when the component is mounted
   * So we used the enabled option to only run the query when the searchCriteria is set
   */
  const { data } = useQuery({
    queryKey: ['repo', searchCriteria],
    queryFn: () => getRepo(searchCriteria as SearchCriteria),
    enabled: searchCriteria !== undefined,
  });

  const queryClient = useQueryClient();
  /**
   * The star mutation
   * The mutation calls the getRepo function
   * We use the mutation’s onSuccess option to update the React Query’s cached repository data with the viewerHasStarred property set to true
   */
  const { mutate } = useMutation({
    mutationFn: starRepo,
    onSuccess: () => {
      queryClient.setQueryData<RepoData>(['repo', searchCriteria], (repo) => {
        if (repo === undefined) {
          return undefined;
        }
        return {
          ...repo,
          viewerHasStarred: true,
        };
      });
    },
    onError: (error) => {
      console.error('Mutation failed', error); // Debugging log
    },
  });

  function handleSearch(search: SearchCriteria) {
    setSearchCriteria(search);
  }

  function handleStarClick() {
    if (data) {
      mutate(data.repository.id);
    }
  }

  return (
    <>
      <Header />
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
