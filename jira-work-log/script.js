const ticketLinkBase = 'https://pgga-es.atlassian.net/browse/';

const colors = [
  'tomato',
  'forestgreen',
  'blueviolet',
  'black',
  'tan',
  'orange',
  'navy',
  'saddlebrown',
];

const container = document.getElementById('container');
const total = document.getElementById('total');

const getData = async (userName, startDate, endDate) => {
  try {
    const response = await fetch(
      `/issues?` +
        new URLSearchParams({
          startDate,
          endDate,
          userName,
        })
    );
    const data = await response.json();
    let totalHours = 0;
    data?.issues?.length
      ? data.issues.map(async (issue, index) => {
          const workLogsData = await fetch(
            '/worklogs?' +
              new URLSearchParams({
                id: issue.id,
                userName,
              })
          );
          const data = await workLogsData.json();
          const { worklogs } = data;
          worklogs.map((wl) => {
            const hours = wl?.timeSpentSeconds / 3600;
            const user = wl?.author?.emailAddress;
            if (
              user === userName &&
              wl.started.slice(0, 10) >= startDate &&
              wl.started.slice(0, 10) <= endDate
            ) {
              container.innerHTML += `
          <table>
              <tbody>
                  <tr>
                      <td ><a style="color:${colors[index]}" href=${
                ticketLinkBase + issue.key
              }>${ticketLinkBase + issue.key}</a></td>
                      <td>${wl.started.slice(0, 10)} </td>
                      <td>${hours} hours </td>
                  </tr>
              </tbody>
          </table>
          `;
              totalHours += hours;
            }
          });
          total.innerHTML = `Total ${totalHours} hours`;
        })
      : (total.innerHTML = `Total 0 hours`);
  } catch (error) {
    total.innerHTML = `An error occurred. Try again later`;
  }
};

form.addEventListener('submit', (event) => {
  container.innerHTML = '';
  total.innerHTML = 'Loading...';
  event.preventDefault();
  const userName = document.getElementById('email').value;
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  getData(userName, startDate, endDate);
});
