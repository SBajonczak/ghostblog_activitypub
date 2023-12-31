exports.InboxHandler = async function (req, res, next) {
    const user = req.params.user;
    console.log(`Got Inbox ${JSON.stringify(req.body)} request for ${user}`);

    const result = {
        '@context': 'https://www.w3.org/ns/activitystreams',
        actor: `https://${config.url.rootDomain}/activitypub/actors/${username}`,
    };


    const activityType = req.body.type;

    switch (activityType) {
        case "Follow":
            result.summary = `Accept to follow ${user}`;
            result.type = "Accept";
            result.object = `${req.body.id}`;
            res.json(inboxData);
            return;
    }

    const inboxData = {
        '@context': 'https://www.w3.org/ns/activitystreams',
        summary: 'Inbox for ' + user,
        type: 'OrderedCollection',
        totalItems: 0,
        orderedItems: [],
    };

    res.json(inboxData);
}