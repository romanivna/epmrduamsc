import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ServerGetterService } from '../../../../shared/services';
import { urls } from './../../../../shared/constants';
import { FormGroup, FormControl } from '@angular/forms';
import { ckEditorConfig } from '../../../../shared/constants/index';
import { DragAndDropService } from '../../../../shared/services/drag-and-drop/drag-and-drop.service';
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-admission-rules',
  templateUrl: './admission-rules.component.html',
  styleUrls: ['./admission-rules.component.scss']
})
export class AdmissionRulesComponent implements OnInit, OnDestroy {

  public admissionRulesForm = new FormGroup({
    header: new FormControl(),
    content: new FormControl()

  });

  public admissionRules: any;

  public questionForConfirmation: any;
  public questionToUpdate: boolean;
  public errMessage: string;
  public content: string;
  public ckEditorConfig = ckEditorConfig;
  public savePressed = false;
  public errorMessages = {
    required: 'This field is required.',
    minLength: 'Value in this field needs to be more than 2 symbols.'
  };
  public data: any;
  private routeGo = new Subject<boolean>();
  private isClickOutside: boolean;

  constructor(private serverGetterService: ServerGetterService,
    private router: Router,
    private elementRef: ElementRef,
    public DnD: DragAndDropService) { }

  ngOnInit() {
    this.admissionRules = {
      content: '',
      id: '',
      img: {
        id: '',
        link: '',
        title: ''
      },
      header: '',
      lang: ''
    };
      this.loadData();

  }

  public loadData(): void {
 this.serverGetterService.get(`${urls.api.prod.files}?lang=uk`)
      .subscribe(data  => {
        this.data = data;
        if (this.data.id !== null) {
          this.admissionRules = data;
          this.admissionRulesForm.get('header').setValue(this.admissionRules.header);
          this.content = this.admissionRules.content;
          this.admissionRulesForm.controls.content.setValue(this.admissionRules.content);
        }
        });
  }

  public updateFile(data: any): void {
    this.admissionRules.img = data;
  }

  public addFile(event: any): void {
    this.DnD.addFile(event, this.admissionRules);
  }

  public suggestToSave(): void {
    this.savePressed = true;
    if (!this.isValid()) {
      return;
    }
    this.questionForConfirmation = {
      text: 'confirmationQuestionSaveAdmissionRules'
    };
    this.questionToUpdate = true;
  }

  public suggestToCancel(): void {
    this.questionForConfirmation = {
      text: 'confirmationQuestionCancel'
    };
    this.questionToUpdate = false;
  }

  public canDeactivate() {
  if (this.savePressed) {
    return true;
  }
    if (this.changeDetection()) {
      return true;
    } else {
      this.suggestToCancel();
      this.isClickOutside = true;
      return this.routeGo.asObservable();
    }
  }

  public changeDetection() {
    const content = !this.admissionRulesForm.value.content && !this.admissionRules.content[0]
      || this.admissionRulesForm.value.content === this.admissionRules.content;
    const header = !this.admissionRulesForm.value.header && !this.admissionRules.header
      || this.admissionRulesForm.value.header === this.admissionRules.header;
    return content && header;
  }

  public decideAboutVoting(answer: boolean): void {
    this.questionForConfirmation = null;
    this.reactOnQuestion(answer);
  }

  private reactOnQuestion(answer) {
    if (this.questionToUpdate && answer) {
      this.save();
    }else if (answer && !this.isClickOutside) {
      this.loadData();
      this.router.navigate([ 'admin/admission-rules' ]);
    } else if (answer && this.isClickOutside) {
      return this.routeGo.next(true);
    } else if (!answer && this.isClickOutside) {
      return this.routeGo.next(false);
    }
  }

  private save(): void {
    this.admissionRules.header = this.elementRef
      .nativeElement
      .querySelector('.form__field-input')
      .value
      .trim();
    this.admissionRules.content = this.admissionRulesForm.value.content;
    this.sendToServer();
  }

  public sendToServer(): void {
    this.admissionRules.lang = 'uk';
      this.serverGetterService.post(urls.api.prod.files, this.admissionRules, {}).subscribe(data => {
        this.admissionRules = data;
      });
  }

  public doScroll() {
    if (!this.admissionRules.img) {
      window.scrollTo(0, 0);
    } else if (!this.admissionRulesForm.valid) {
      const [firstInvalidControl, ] = Object.keys(this.admissionRulesForm.controls)
      .filter(control => {
        const field = this.admissionRulesForm.get(control);
        if ((field as FormControl).invalid) {
          return control;
        }
      });
      const scrollMargin = 50;
      window.scrollTo(0, document.getElementById(firstInvalidControl).getBoundingClientRect().top + window.scrollY - scrollMargin);
    }
  }

  public isValid(): boolean {
    const isValidContent = !!this.admissionRulesForm.controls.content.value;
    this.doScroll();
    return this.admissionRulesForm.valid && this.admissionRules.img.link && isValidContent;
  }

  ngOnDestroy() {
    this.routeGo.unsubscribe();
  }
}
