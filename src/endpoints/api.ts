import { ICustomWorld } from '../support/custom-world';
import { getAuthorizationBasic } from '../utils/utils';

/**
 * Sends a request for a list of courses.
 * The list is filtered by the Development category, free price, and english language.
 *
 * @export
 * @param {ICustomWorld['api']} api
 * @return {APIResponse}
 */
export async function getCoursesList(api: ICustomWorld['api']) {
  if (!api?.context) throw new Error('No context provided');

  const accessToken = await getAuthorizationBasic();

  const request = '?page=1&category=Development&price=price-free&language=en';

  const response = await api.context.get(request, {
    headers: {
      Accept: 'application/json, text/plain, */*',
      Authorization: accessToken,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return response;
}
