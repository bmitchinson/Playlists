# Ideal steps to auto update firestore
Update Spotify playlists as needed / leave public the ones to sync

When wanting to repopulate the site / (firestore) 
- Run deletion suite
  - Clear playlists off of all platforms except Spotify (Apple music doesn't allow deletions, manual from mac?)

- Clear firestore of all playlists, every service
- Populate Firestore with everything that's public on spotify -> document for each by name, fields for each service 

- Manually batch sync all public playlists to each platform on Soundiiz (API Not yet available ): )
- Manually Batch export all playlists for safe keeping to csv

- Run populate suite (For each service):
  - Fetches all playlists (apple music: ones created on that day?)
  - finds corresponding document on firestore, and updates it's service respective url link

site then is always refrencing firestore, always up to date.
