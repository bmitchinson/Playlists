# Ideal steps to update site data

Update Spotify playlists as needed / leave public the ones to sync

When wanting to repopulate the alternate playlists / (firestore)

-   Run deletion suite

    -   Clear database
    -   Delete all playlists from each service except for Spotify

-   Rehydrate Firestore with everything that's public on spotify

    -   document for each playlist by title
    -   links map with empty slots for each service

-   Soundiiz steps

    -   Manually batch sync all public playlists to each platform on Soundiiz (API Not yet available ): )
    -   Manually Batch export all playlists for safe keeping to csv

-   Run populate suite (For each service):

    -   Fetches all playlists (apple music: ones created on that day?)
    -   finds corresponding document on firestore, and updates it's service respective url link

site is always refrencing firestore, always up to date.
