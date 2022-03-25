import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../modelo/user.model";


@Injectable()
export class userService {
  //usersCollection: AngularFirestoreCollection<User>;
  //userDoc: AngularFirestoreDocument<User>;
  users: Observable<User[]>;
  user: Observable<User>;
}