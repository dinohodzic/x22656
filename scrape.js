fetch('https://kamagrabosna.ba/').then(r=>r.text()).then(t=>{
    const regex = /<h3[^>]*>([\s\S]*?)<\/h3>|.{0,20}(KM).{0,20}/gi;
    let match;
    const matches = new Set();
    while ((match = regex.exec(t)) !== null) {
        matches.add(match[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
    }
    console.log(Array.from(matches).join('\n'));
});
