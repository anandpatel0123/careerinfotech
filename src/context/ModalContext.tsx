import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { CourseDetailsDialog } from '../components/dialogs/CourseDetailsDialog';
import { EnquiryDialog } from '../components/dialogs/EnquiryDialog';
import { findCourse } from '../data/courses';

type ActiveModal =
  | { type: 'course'; courseId: string }
  | { type: 'enquiry'; courseId?: string; openCount: number }
  | null;

interface ModalActions {
  openCourse: (courseId: string) => void;
  openEnquiry: (courseId?: string) => void;
}

const ModalContext = createContext<ModalActions | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ActiveModal>(null);
  const enquiryOpenCount = useRef(0);

  const close = useCallback(() => setModal(null), []);
  const openCourse = useCallback((courseId: string) => setModal({ type: 'course', courseId }), []);
  const openEnquiry = useCallback((courseId?: string) => {
    enquiryOpenCount.current += 1;
    setModal({ type: 'enquiry', courseId, openCount: enquiryOpenCount.current });
  }, []);

  const isOpen = modal !== null;

  useEffect(() => {
    document.documentElement.classList.toggle('modal-open', isOpen);
  }, [isOpen]);

  const actions = useMemo(() => ({ openCourse, openEnquiry }), [openCourse, openEnquiry]);

  return (
    <ModalContext.Provider value={actions}>
      {children}
      {/* Order matters: the details dialog must close, restoring focus, before enquiry opens. */}
      <CourseDetailsDialog
        course={modal?.type === 'course' ? findCourse(modal.courseId) : undefined}
        onClose={close}
        onEnquire={openEnquiry}
      />
      <EnquiryDialog
        open={modal?.type === 'enquiry'}
        // A new key per opening resets the form, so no personal details linger in memory.
        formKey={modal?.type === 'enquiry' ? modal.openCount : 0}
        initialCourseId={modal?.type === 'enquiry' ? modal.courseId : undefined}
        onClose={close}
      />
    </ModalContext.Provider>
  );
}

export function useModals() {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModals must be used inside ModalProvider');
  return context;
}
