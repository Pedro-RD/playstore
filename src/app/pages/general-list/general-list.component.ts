import { Component } from '@angular/core';
import { CardGameComponent } from '../../components/shared/card-game/card-game.component';

@Component({
  selector: 'app-general-list',
  standalone: true,
  imports: [CardGameComponent],
  templateUrl: './general-list.component.html',
  styleUrl: './general-list.component.scss',
})
export class GeneralListComponent {
  games = [
    {
      id: 340,
      title: 'Game Of Thrones Winter Is Coming',
      thumbnail: 'https://www.freetogame.com/g/340/thumbnail.jpg',
      short_description:
        'A free-to-play browser-based RTS based on the George R.R. Martin novels and popular HBO series.',
      game_url:
        'https://www.freetogame.com/open/game-of-thrones-winter-is-coming',
      genre: 'Strategy',
      platform: 'Web Browser',
      publisher: 'GTArcade',
      developer: 'YOOZOO Games ',
      release_date: '2019-11-14',
      freetogame_profile_url:
        'https://www.freetogame.com/game-of-thrones-winter-is-coming',
    },
    {
      id: 340,
      title: 'Game Of Thrones Winter Is Coming',
      thumbnail: 'https://www.freetogame.com/g/340/thumbnail.jpg',
      short_description:
        'A free-to-play browser-based RTS based on the George R.R. Martin novels and popular HBO series.',
      game_url:
        'https://www.freetogame.com/open/game-of-thrones-winter-is-coming',
      genre: 'Strategy',
      platform: 'Web Browser',
      publisher: 'GTArcade',
      developer: 'YOOZOO Games ',
      release_date: '2019-11-14',
      freetogame_profile_url:
        'https://www.freetogame.com/game-of-thrones-winter-is-coming',
    },
  ];
}
