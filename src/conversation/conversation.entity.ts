import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type SupportedLanguagesType = 'fr' | 'en';
export type StageType = 'setup' | 'support' | 'feedback';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  gdpr: boolean;

  @Column({type: "enum",
        enum: ["fr", "en"], nullable: true })
  language: SupportedLanguagesType;

  @Column({ type: "enum",
        enum: ["setup", "support", "feedback"]})
  stage: StageType;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  country: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  time_created: Date;
}
