import {Component, OnInit} from "@angular/core";
import {EventService} from "../shared/event.service";
import {ActivatedRoute, Params} from "@angular/router";
import {IEvent, ISession} from "../shared/index";
@Component({
    templateUrl: 'app/events/event-detail/event-detail.component.html',
    styles: [`
        a {cursor: pointer;}
    
    `]
})
export class EventDetailsComponent implements OnInit {
    event:IEvent
    addMode:boolean
    filterBy: string = 'all'
    sortBy: string = 'votes'

    constructor(private eventService:EventService,
                private route:ActivatedRoute){

    }
    ngOnInit() {
        this.route.data.forEach((data) => {
            // this.event = this.eventService.getEvent(+params['id'])
            // this.eventService.getEvent(+params['id']).subscribe((event: IEvent) => {
            this.event = data['event']
              // this.event = event
              this.addMode = false
            })

    }

    addSession() {
        this.addMode = true
    }

    saveNewSession(session:ISession) {
        const nextId = Math.max.apply(null, this.event.sessions.map(
            s => s.id));
        session.id = nextId + 1
        this.event.sessions.push(session)
        this.eventService.saveEvent(this.event)
        this.addMode = false
    }

    cancelAddSession() {
        this.addMode = false
    }


}