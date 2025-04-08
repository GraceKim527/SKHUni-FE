'use client';

import { Project } from '@/types/projects';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { MdPreview } from 'md-editor-rt';
import Image from 'next/image';

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

export const ProjectDetailModal = ({ isOpen, onClose, project }: ProjectDetailModalProps) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-9999" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30" />
        </Transition.Child>

        <div className="flex fixed inset-0 justify-center items-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl overflow-y-auto max-h-[80vh]">
              <div className="flex flex-col gap-8">
                <img
                  src={project.picture}
                  alt={project.title}
                  className="object-cover w-full h-64 rounded-lg"
                />

                <div className="flex flex-col gap-4">
                  <Dialog.Title className="text-xl font-bold text-gray-900">
                    {project.title}
                  </Dialog.Title>
                  <p className="text-sm text-gray-600">{project.introLine}</p>

                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-semibold text-gray-700">프로젝트 설명</h4>
                    <MdPreview value={project.introduction} theme="light" language="ko-KR" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex gap-3">
                      <a href={project.githubLink1} target="_blank" rel="noopener noreferrer">
                        <Image src="/assets/icons/github.svg" alt="깃허브" width={32} height={32} />
                      </a>
                    </div>
                  </div>

                  <a
                    href={project.siteLink && project.siteLink !== '' ? project.siteLink : ''}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex justify-center items-center px-4 py-2 text-white bg-[#512DA8] rounded-md 
                    ${
                      project.siteLink !== ''
                        ? 'cursor-pointer bg-[#512DA8]'
                        : 'cursor-not-allowed bg-gray-300'
                    }
                    `}
                  >
                    <span className="text-white">프로젝트 보러가기</span>
                  </a>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
