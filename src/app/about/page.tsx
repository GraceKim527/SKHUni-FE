'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

const sections = [
  {
    title: '🎯 스쿠니란?',
    content:
      '스쿠니는 성공회대 IT 커뮤니티를 위한 네트워킹 플랫폼입니다. 프로필 기반의 연결을 통해 커피챗, 코드리뷰, 프로젝트 팀빌딩 등 다양한 협업을 유도합니다.',
  },
  {
    title: '💡 스쿠니 서비스를 시작한 이유',
    content:
      '스쿠톤 해커톤을 통해 교내 IT 커뮤니티 활성화에 대한 니즈를 발견했고, 단발적인 이벤트가 아닌 지속 가능한 네트워킹이 필요하다고 느껴 스쿠니를 기획했습니다.',
  },
  {
    title: '🛠 스쿠니의 주요 기능',
    content: '- 역할 기반 권한 관리\n- 프로필 기반 네트워킹\n- 커피챗 및 코드리뷰 요청 기능',
  },
];

const teamMembers = [
  {
    role: 'Frontend',
    name: '김은혜',
    description: '사용자 경험과 함께 함께하는 문화를 중심으로 두는 프론트엔드 개발자입니다.',
    image: '/assets/img/gracekim.png',
  },
  {
    role: 'Backend',
    name: '최기웅',
    description: '사람들과 소통하는것을 좋아하고 배움과 도전을 즐기는 백엔드 개발자입니다.',
    image: '/assets/img/woong.png',
  },
];

export default function AboutPage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="flex flex-col gap-12 px-6 py-16 mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold text-center text-gray-900" data-aos="fade-up">
        About Skhuni
      </h1>
      {sections.map((section, index) => (
        <div
          className="flex flex-col gap-2"
          key={section.title}
          data-aos="fade-up"
          data-aos-delay={index * 100}
        >
          <h2 className="mb-2 text-2xl font-semibold text-gray-800">{section.title}</h2>
          <p className="text-gray-600 whitespace-pre-line">{section.content}</p>
        </div>
      ))}
      <div className="flex flex-col gap-2" data-aos="fade-up" data-aos-delay="300">
        <h2 className="mb-2 text-2xl font-semibold text-gray-800">👩‍💻 스쿠니 개발 팀</h2>
        <p className="text-gray-600">
          스쿠니는 스쿠톤 운영진 경험을 가진 팀원들이 직접 기획하고 개발했습니다. 교내 IT 커뮤니티
          문화를 스스로 만들어가는 것을 목표로 합니다.
        </p>

        <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="flex gap-4 items-center p-4 rounded-lg border border-gray-200 shadow-sm"
            >
              <img
                src={member.image}
                alt={member.name}
                className="object-cover overflow-hidden flex-shrink-0 w-16 h-16 rounded-full"
              />
              <div className="flex flex-col">
                <h4 className="text-lg font-semibold text-gray-900">{member.name}</h4>
                <span className="text-sm font-medium text-purple-700">{member.role}</span>
                <p className="mt-1 text-sm text-gray-600">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div data-aos="zoom-in" data-aos-delay="200" className="text-center">
        <Link
          href="/"
          className="inline-block mt-8 bg-[#512DA8] px-6 py-3 rounded-lg text-base hover:bg-[#3f2291] transition"
        >
          <span className="text-white">메인으로 돌아가기</span>
        </Link>
      </div>
    </section>
  );
}
