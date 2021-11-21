import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { fetchRedirectionData } from '../../services/RedirectService';

const ShortLinkHandler = (props) => {
  const { shortSlug } = useParams();
  const history = useHistory();

  useEffect(() => {
    // Fetch the source URL for this short URL
    const dataPayload = {
      slug: shortSlug,
    };

    fetchRedirectionData(dataPayload)
      .then((responseData) => {
        if (responseData.data && responseData.data.length === 1) {
          const link = responseData.data[0];

          if (link.is_expired) {
            // Redirect to 404
            history.replace('/404');
          } else {
            // Redirect to Source
            window.location.href = link.source;
          }
        } else {
          // Redirect to 404
          history.replace('/404');
        }
      })
      .catch((errorData) => {
        console.log('Error While Fetching Link Data', errorData);
        history.push('/error');
      });
  }, []);

  return null;
};

export default ShortLinkHandler;
