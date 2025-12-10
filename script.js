
async function loadPresskit() {
  const res = await fetch('presskit.json');
  const data = await res.json();

  const g = data.game;
  const s = data.studio;
  const vis = data.media;
  const gameTitle = g.title || 'Game Title';

  document.getElementById('title').textContent = gameTitle;
  document.getElementById('tagline').textContent = g.tagline || '';
  document.getElementById('short').textContent = g.short_description || '';
  document.getElementById('long').innerHTML = g.long_description || '';

  const gameNames = document.getElementsByClassName("gamename");
  Array.from(gameNames).forEach((el) => {
    el.innerHtml = gameTitle;
  });

  const gameUrl = g.game_url;
  const gameUrlElements = document.getElementsByClassName("gameurl");
  Array.from(gameUrlElements).forEach((el) => {
    el.setAttribute("href", gameUrl || '');
  });

  document.getElementById('cover').src = vis.cover || '';
  document.getElementById('presskiturl').setAttribute("href", g.presskiturl);

  document.getElementById('widgetreftourl').innerHTML = g.widgetreftourl || '';

  const facts = [
    ['Genres', (g.genres || []).join(', ')],
    ['Platforms', (g.platforms || []).join(', ')],
    ['Release', g.release_date || 'TBA'],
    ['Modes', (g.modes || []).join(', ')],
    ['Team Size', g.team_size],
    ['Development Time', g.development_time],
    ['Game Engine', g.game_engine],
    ['Status', g.development_status],
  ];
  document.getElementById('facts').innerHTML = facts.map(([k, v]) => `<div class='fact'><b>${k}</b><div>${v}</div></div>`).join('');

  document.getElementById('studio').textContent = `${s.name}`;
  const contacts = s.contact || {};
  document.getElementById('contacts').innerHTML = Object.entries(contacts).filter(([k, v]) => v).map(([k, v]) => `<li><a class='brand' target='_blank' href='${v}'>${k}</a></li>`).join('');

  document.getElementById('lastUpdated').textContent = "Last Updated: 2025-08-30";
}

loadPresskit();
