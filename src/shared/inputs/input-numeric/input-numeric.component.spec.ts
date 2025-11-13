import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputNumericComponent } from './input-numeric.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NumericInputConfig, ErrorMessageConfig } from '../inputs.model';
import { fakeAsync, tick } from '@angular/core/testing';

// Mock crypto.randomUUID for Jest
let uuidCounter = 0;
Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: jest.fn(() => `test-uuid-${uuidCounter++}`)
  },
  writable: true
});

// Test host component to test inputs and outputs
@Component({
  standalone: true,
  imports: [InputNumericComponent],
  template: `
    <ui-input-numeric
      [label]="label"
      [placeholder]="placeholder"
      [initialValue]="initialValue"
      [validators]="validators"
      [labelPosition]="labelPosition"
      [size]="size"
      [showErrorMessage]="showErrorMessage"
      [errorMessages]="errorMessages"
      (inputChange)="onNumberInputChange($event)"
    />
  `,
})
class TestHostComponent {
  label = 'Test Label';
  placeholder = 'Enter number';
  initialValue: number | null = null;
  validators: NumericInputConfig = {};
  labelPosition: 'top' | 'left' | 'right' = 'top';
  size: 'default' | 'compact' = 'default';
  showErrorMessage = true;
  errorMessages: ErrorMessageConfig = {};
  onNumberInputChange = jest.fn();
}

describe('InputNumericComponent', () => {
  let component: InputNumericComponent;
  let fixture: ComponentFixture<InputNumericComponent>;

  // Helper function to create a standalone component fixture
  const createStandaloneFixture = async (props: Partial<{
    label: string;
    placeholder: string;
    initialValue: number | null;
    validators: NumericInputConfig;
    labelPosition: 'top' | 'left' | 'right';
    size: 'default' | 'compact';
    showErrorMessage: boolean;
    errorMessages: ErrorMessageConfig;
  }> = {}) => {
    const fixture = TestBed.createComponent(InputNumericComponent);
    const component = fixture.componentInstance;

    // Set required inputs using fixture.componentRef.setInput
    fixture.componentRef.setInput('label', props.label || 'Test Label');
    fixture.componentRef.setInput('placeholder', props.placeholder || '');
    fixture.componentRef.setInput('initialValue', props.initialValue || null);
    fixture.componentRef.setInput('validators', props.validators || {});
    fixture.componentRef.setInput('labelPosition', props.labelPosition || 'top');
    fixture.componentRef.setInput('size', props.size || 'default');
    fixture.componentRef.setInput('showErrorMessage', props.showErrorMessage !== undefined ? props.showErrorMessage : true);
    fixture.componentRef.setInput('errorMessages', props.errorMessages || {});

    return { fixture, component };
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        InputNumericComponent,
        TestHostComponent
      ],
    }).compileComponents();

    // Create standalone fixture for unit tests
    const standaloneResult = await createStandaloneFixture();
    fixture = standaloneResult.fixture;
    component = standaloneResult.component;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with default values', () => {
      fixture.detectChanges();
      component.ngOnInit();

      expect(component.formControl).toBeInstanceOf(FormControl);
      expect(component.formControl.value).toBeNull();
      expect(component.id).toBeDefined();
      expect(component.ariaId).toBeDefined();
      expect(component.id).not.toBe(component.ariaId);
    });

    it('should initialize with provided initial value', async () => {
      const { fixture, component } = await createStandaloneFixture({ initialValue: 42 });
      fixture.detectChanges();
      component.ngOnInit();

      expect(component.formControl.value).toBe(42);
    });

    it('should apply base validators by default', () => {
      fixture.detectChanges();
      component.ngOnInit();

      // Test that required validator is applied by default
      component.formControl.setValue(null);
      expect(component.formControl.invalid).toBe(true);
      expect(component.formControl.errors?.['required']).toBeTruthy();

      // Test that min validator is applied (default min: 0)
      component.formControl.setValue(-5);
      expect(component.formControl.invalid).toBe(true);
      expect(component.formControl.errors?.['min']).toBeTruthy();

      // Test valid value within default constraints
      component.formControl.setValue(10);
      expect(component.formControl.valid).toBe(true);
    });

    it('should merge custom validators with base validators', async () => {
      const customValidators: NumericInputConfig = {
        required: false,
        min: 10,
        max: 100,
      };

      const { fixture, component } = await createStandaloneFixture({ validators: customValidators });
      fixture.detectChanges();
      component.ngOnInit();

      // Test min validator
      component.formControl.setValue(5);
      expect(component.formControl.invalid).toBe(true);
      expect(component.formControl.errors?.['min']).toBeTruthy();

      // Test max validator
      component.formControl.setValue(150);
      expect(component.formControl.invalid).toBe(true);
      expect(component.formControl.errors?.['max']).toBeTruthy();

      // Test valid value
      component.formControl.setValue(50);
      expect(component.formControl.valid).toBe(true);
    });
  });

  describe('Template Rendering', () => {
    it('should render label with correct text', () => {
      fixture.detectChanges();
      const labelElement = fixture.debugElement.query(By.css('label')).nativeElement;
      const labelText = labelElement.querySelector('.label-text');
      expect(labelText?.textContent?.trim()).toBe('Test Label');
    });

    it('should set input attributes correctly', () => {
      fixture.detectChanges();
      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
      expect(inputElement.type).toBe('number');
      expect(inputElement.id).toBe(component.id);
      expect(inputElement.getAttribute('aria-describedby')).toBe(component.ariaId);
    });

    it('should apply label position class', async () => {
      const { fixture, component } = await createStandaloneFixture({ labelPosition: 'left' });
      fixture.detectChanges();

      const label = fixture.debugElement.query(By.css('label')).nativeElement;
      expect(label.className).toContain('left');
    });

    it('should apply size class when compact', async () => {
      const { fixture, component } = await createStandaloneFixture({ size: 'compact' });
      fixture.detectChanges();

      const label = fixture.debugElement.query(By.css('label')).nativeElement;
      expect(label.classList.contains('size')).toBe(true);
    });

    it('should show error message when input is invalid', fakeAsync(() => {
      fixture.detectChanges();
      component.ngOnInit();

      // Make input invalid and touched
      component.formControl.setValue(null);
      component.formControl.markAsTouched();
      component.formControl.updateValueAndValidity();

      // Wait for debounced statusChanges
      tick(150);
      fixture.detectChanges();

      const errorMessage = fixture.debugElement.query(By.css('.input-error-message'));
      expect(errorMessage).toBeTruthy();
      expect(errorMessage.nativeElement.id).toBe(component.ariaId);
    }));

    it('should hide error message when showErrorMessage is false', async () => {
      const { fixture, component } = await createStandaloneFixture({ showErrorMessage: false });
      fixture.detectChanges();
      component.ngOnInit();

      // Make input invalid
      component.formControl.setValue(null);
      component.formControl.updateValueAndValidity();
      fixture.detectChanges();

      const errorMessage = fixture.debugElement.query(By.css('.input-error-message'));
      expect(errorMessage).toBeFalsy();
    });
  });

  describe('Input Validation and Sanitization', () => {
    let inputElement: HTMLInputElement;

    beforeEach(() => {
      fixture.detectChanges();
      component.ngOnInit();
      inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    });

    it('should prevent invalid characters on keydown', () => {
      const preventDefaultSpy = jest.fn();

      // Test preventing 'e'
      const eEvent = new KeyboardEvent('keydown', { key: 'e' });
      Object.defineProperty(eEvent, 'preventDefault', { value: preventDefaultSpy });
      component.handleOnKeyDown(eEvent);
      expect(preventDefaultSpy).toHaveBeenCalled();

      preventDefaultSpy.mockClear();

      // Test preventing '+'
      const plusEvent = new KeyboardEvent('keydown', { key: '+' });
      Object.defineProperty(plusEvent, 'preventDefault', { value: preventDefaultSpy });
      component.handleOnKeyDown(plusEvent);
      expect(preventDefaultSpy).toHaveBeenCalled();

      preventDefaultSpy.mockClear();

      // Test preventing '-'
      const minusEvent = new KeyboardEvent('keydown', { key: '-' });
      Object.defineProperty(minusEvent, 'preventDefault', { value: preventDefaultSpy });
      component.handleOnKeyDown(minusEvent);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should allow valid numeric characters', () => {
      const preventDefaultSpy = jest.fn();
      const validEvent = new KeyboardEvent('keydown', { key: '5' });
      Object.defineProperty(validEvent, 'preventDefault', { value: preventDefaultSpy });

      component.handleOnKeyDown(validEvent);
      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('should remove leading zeros on blur', () => {
      component.formControl.setValue('007');
      component.handleOnBlur();
      expect(component.formControl.value).toBe('7');
    });

    it('should preserve decimal values when removing leading zeros', () => {
      component.formControl.setValue('00123.45');
      component.handleOnBlur();
      expect(component.formControl.value).toBe('123.45');
    });

    it('should not modify single zero on blur', () => {
      component.formControl.setValue('0');
      component.handleOnBlur();
      expect(component.formControl.value).toBe('0');
    });

    it('should handle paste events with sanitization', () => {
      const mockClipboardData = {
        getData: jest.fn().mockReturnValue('abc123.45def')
      };

      // Mock input element as a basic object with required properties
      const mockInput = {
        focus: jest.fn(),
        selectionStart: 0,
        selectionEnd: 0,
        setSelectionRange: jest.fn(),
        value: ''
      };

      // Create a mock paste event object
      const pasteEvent = {
        preventDefault: jest.fn(),
        clipboardData: mockClipboardData,
        target: mockInput
      } as any;

      // Spy on insertTextAtCursor to avoid DOM manipulation issues in tests
      const insertTextSpy = jest.spyOn<any, any>(component, 'insertTextAtCursor');

      component.handleOnPaste(pasteEvent);

      expect(pasteEvent.preventDefault).toHaveBeenCalled();
      expect(mockClipboardData.getData).toHaveBeenCalledWith('text');
      // Verify sanitized value ('123.45') is passed to insertTextAtCursor
      expect(insertTextSpy).toHaveBeenCalledWith(mockInput, '123.45');
    });
  });

  describe('Output Events', () => {
    it('should emit inputChange on form control changes with debounce', fakeAsync(() => {
      // Create host fixture for this specific test
      const testHostFixture = TestBed.createComponent(TestHostComponent);
      testHostFixture.detectChanges();

      const inputComponent = testHostFixture.debugElement.query(
        By.directive(InputNumericComponent)
      ).componentInstance;

      const emitSpy = jest.fn();
      inputComponent.inputChange.subscribe(emitSpy);

      // Trigger form control change
      inputComponent.formControl.setValue(42);

      // Fast forward through debounce time
      tick(300);

      expect(emitSpy).toHaveBeenCalledWith({
        value: 42,
        isValid: true,
        errors: null
      });
    }));
  });

  describe('Error Messages', () => {
    it('should display custom error messages', fakeAsync(async () => {
      const customErrorMessages: ErrorMessageConfig = {
        required: 'This field is mandatory',
        min: 'Value must be at least 10'
      };

      const { fixture, component } = await createStandaloneFixture({
        errorMessages: customErrorMessages,
        validators: { min: 10, max: 100 }
      });

      fixture.detectChanges();
      component.ngOnInit();

      // Test custom required message
      component.formControl.setValue(null);
      component.formControl.markAsTouched();
      component.formControl.updateValueAndValidity();
      tick(150);
      fixture.detectChanges();

      expect(component.errorMessage()).toBe('This field is mandatory');

      // Test custom min message
      component.formControl.setValue(5);
      component.formControl.markAsTouched();
      component.formControl.updateValueAndValidity();
      tick(150);
      fixture.detectChanges();

      expect(component.errorMessage()).toBe('Value must be at least 10');
    }));
  });
});
