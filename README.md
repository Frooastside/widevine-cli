# Widevine CLI

### Output Templates

```text

{series_name} → Name of the series
{season_number} → Number of the season
{title} → Title
{episode_number} → Number of the episode
{ext} → File Extension

```

#### Example

```bash
widevine-cli -o "./{series_name}/Season {season_number}/{title} S{season_number}E{episode_number}.{ext}"
```
