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

    // Note: Long description is now hardcoded in index.html

    // Update all instances of game name if necessary
    const gameNames = document.getElementsByClassName("gamename");
    Array.from(gameNames).forEach((el) => {
        el.innerHTML = gameTitle;
    });

    // Link Game URL (Steam)
    const gameUrl = g.game_url;
    const gameUrlElements = document.getElementsByClassName("gameurl");
    Array.from(gameUrlElements).forEach((el) => {
        el.setAttribute("href", gameUrl || '');
    });

    // Cover Image
    document.getElementById('cover').src = vis.cover || '';

    // Set Presskit Download Links (Top and Bottom)
    const pkUrl = g.presskiturl;
    const bottomBtn = document.getElementById('presskiturl');
    const topBtn = document.getElementById('presskit-btn-top');

    if (bottomBtn) bottomBtn.setAttribute("href", pkUrl);
    if (topBtn) topBtn.setAttribute("href", pkUrl);

    // Steam Widget
    document.getElementById('widgetreftourl').innerHTML = g.widgetreftourl || '';

    // Facts Grid
    const facts = [
        ['Genres', (g.genres || []).join(', ')],
        ['Platforms', (g.platforms || []).join(', ')],
        ['Release', g.release_date || 'TBA'],
        ['Modes', (g.modes || []).join(', ')],
        ['Team Size', g.team_size],
        ['Game Engine', g.game_engine],
        ['Status', g.development_status],
    ];
    document.getElementById('facts').innerHTML = facts.map(([k, v]) =>
        `<div class='fact'><b>${k}</b><div>${v}</div></div>`
    ).join('');

    // Contacts
    const contacts = s.contact || {};
    document.getElementById('contacts').innerHTML = Object.entries(contacts)
        .filter(([k, v]) => v)
        .map(([k, v]) => `<li><a class='btn-secondary' target='_blank' href='${v}'>${k}</a></li>`)
        .join('');
}

loadPresskit();